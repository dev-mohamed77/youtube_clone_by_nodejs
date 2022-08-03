class Audit {
  action: string;
  status: number;
  data: any | null;
  error: any | null;
  audit_by: string;
  audit_on: Date;
  constructor(
    action: string,
    status: number,
    data: any | null,
    error: any | null,
    audit_by: string,
    audit_on: Date
  ) {
    this.action = action;
    this.status = status;
    this.data = data;
    this.error = error;
    this.audit_by = audit_by;
    this.audit_on = audit_on;
  }
}

export default Audit;
