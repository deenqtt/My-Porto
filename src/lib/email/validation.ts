import type { ContactValidation } from './types';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 100;
const MAX_SUBJECT = 200;
const MAX_MESSAGE = 2000;

export function validateContact(data: unknown): ContactValidation {
  const errors: ContactValidation['errors'] = {};

  if (!data || typeof data !== 'object') {
    return { valid: false, errors: { name: 'Invalid request body.' } };
  }

  const { name, email, subject, message } = data as Record<string, unknown>;

  if (!name || typeof name !== 'string' || !name.trim()) {
    errors.name = 'Name is required.';
  } else if (name.length > MAX_NAME) {
    errors.name = `Name must be ${MAX_NAME} characters or fewer.`;
  }

  if (!email || typeof email !== 'string' || !email.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Invalid email address.';
  }

  if (!subject || typeof subject !== 'string' || !subject.trim()) {
    errors.subject = 'Subject is required.';
  } else if (subject.length > MAX_SUBJECT) {
    errors.subject = `Subject must be ${MAX_SUBJECT} characters or fewer.`;
  }

  if (!message || typeof message !== 'string' || !message.trim()) {
    errors.message = 'Message is required.';
  } else if (message.length > MAX_MESSAGE) {
    errors.message = `Message must be ${MAX_MESSAGE} characters or fewer.`;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
