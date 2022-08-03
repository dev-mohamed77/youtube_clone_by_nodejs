import { EventEmitter } from "events";
import db_connection from "../config/db.config/connection";
import Audit from "../models/audit_model";

const emitter = new EventEmitter();

const event_name = "Audit";

emitter.on(event_name, async (audit: Audit) => {
  const query =
    "INSERT INTO audit (audit_action, audit_status, audit_data, audit_error, audit_by, audit_created_at) VALUES ($1, $2, $3, $4, $5, $6)";

  const values = [
    audit.action,
    audit.status,
    audit.data,
    audit.error,
    audit.audit_by,
    audit.audit_on,
  ];

  const result = await db_connection(query, values);
});

export const prepare_audit = (
  action: string,
  status: number,
  data: any | null,
  error: any | null,
  audit_by: string,
  audit_on: Date
) => {
  const audit = new Audit(action, status, data, error, audit_by, audit_on);

  emitter.emit(event_name, audit);
};
