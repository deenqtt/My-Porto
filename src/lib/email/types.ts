export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface EmailConfig {
  from: string;
  to: string;
  replyTo?: string;
}

export interface SendEmailResult {
  success: boolean;
  error?: string;
}

export interface ContactValidation {
  valid: boolean;
  errors: Partial<Record<keyof ContactPayload, string>>;
}
