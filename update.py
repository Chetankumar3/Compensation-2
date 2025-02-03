@app.route('/update_form_status/<int:form_id>', methods=['POST'])
def update_form_status(form_id):
    """
    API to update the status of a compensation form.
    Roles: Rangers and SDOs
    """

    data = request.json
    emp_id = data.get("emp_id")  # Employee ID of the verifier
    action = data.get("action")  # 'accept', 'reject', or 'send_back'

    if not emp_id or not action:
        return jsonify({"error": "Missing required fields: emp_id or action"}), 400

    connection = create_connection()
    if not connection:
        return jsonify({"error": "Failed to connect to database"}), 500

    try:
        cursor = connection.cursor()

        # Fetch current form details
        query = "SELECT status, verifiedBy FROM compensationform WHERE FormID = %s"
        cursor.execute(query, (form_id,))
        form = cursor.fetchone()

        if not form:
            return jsonify({"error": "Form not found"}), 404

        status_str, verified_by = form
        verified_by = verified_by if verified_by else ""  # Handle null verifiedBy

        try:
            current_status = int(status_str)  # Convert status from string to integer
        except ValueError:
            return jsonify({"error": "Invalid status value in database"}), 500

        # Determine next status based on action
        if action == "accept":
            next_status = current_status + 1  # Approved by ranger

        elif action == "reject":
            next_status = -1  # Rejected

        elif action == "send_back":
            next_status = max(0, current_status - 1)  # Ensure status doesn't go below 0

        else:
            return jsonify({"error": "Invalid action"}), 400

        # Convert the next_status back to string for storing in the database
        next_status_str = str(next_status)

        # Append verifier ID if not already included
        if emp_id not in verified_by.split(","):
            verified_by = (verified_by + "," + emp_id).strip(",")

        # Update form status and verification details
        update_query = """
        UPDATE compensationform
        SET status = %s, verifiedBy = %s
        WHERE FormID = %s
        """
        cursor.execute(update_query, (next_status_str, verified_by, form_id))
        connection.commit()

        return jsonify({
            "message": f"Form {form_id} status updated successfully",
            "new_status": next_status_str,
            "verified_by": verified_by
        }), 200

    except mysql.connector.Error as e:
        logging.error(f"Database error: {e}")
        return jsonify({"error": str(e)}), 500

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()