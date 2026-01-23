import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';
import { cn } from '@/lib/utils';

/**
 * Form state types
 */
type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

/**
 * Web3Forms API configuration
 * Access key should be set via environment variable
 */
const WEB3FORMS_ACCESS_KEY = import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY ?? '';

/**
 * Validates email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * ContactForm component with Web3Forms integration.
 * Includes client-side validation, honeypot spam protection,
 * and accessible form controls.
 */
export default function ContactForm(): React.ReactElement {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [honeypot, setHoneypot] = useState('');

  /**
   * Validates form data and returns errors object
   */
  function validateForm(): FormErrors {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    return newErrors;
  }

  /**
   * Handles input changes
   */
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  /**
   * Handles form submission via Web3Forms API
   */
  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();

    // Check honeypot (spam protection)
    if (honeypot) {
      console.log('Spam detected');
      return;
    }

    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('submitting');
    setErrors({});

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New contact from ${formData.name} via Jerna Digital`,
          from_name: 'Jerna Digital Contact Form',
        }),
      });

      const result = (await response.json()) as { success: boolean };

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <form
      onSubmit={(e) => void handleSubmit(e)}
      className="space-y-6"
      noValidate
    >
      {/* Honeypot field - hidden from users, catches bots */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <input
          type="text"
          name="honeypot"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Name field */}
      <div className="space-y-2">
        <Label htmlFor="name" required>
          Name
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          disabled={status === 'submitting'}
          autoComplete="name"
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        <AnimatePresence>
          {errors.name && (
            <motion.p
              id="name-error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-error text-sm"
              role="alert"
            >
              {errors.name}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Email field */}
      <div className="space-y-2">
        <Label htmlFor="email" required>
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          disabled={status === 'submitting'}
          autoComplete="email"
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        <AnimatePresence>
          {errors.email && (
            <motion.p
              id="email-error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-error text-sm"
              role="alert"
            >
              {errors.email}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Message field */}
      <div className="space-y-2">
        <Label htmlFor="message" required>
          Message
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell me about your project or challenge..."
          value={formData.message}
          onChange={handleChange}
          error={!!errors.message}
          disabled={status === 'submitting'}
          rows={5}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        <AnimatePresence>
          {errors.message && (
            <motion.p
              id="message-error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-error text-sm"
              role="alert"
            >
              {errors.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={status === 'submitting'}
        className="w-full"
      >
        {status === 'submitting' ? (
          <span className="flex items-center gap-2">
            <svg
              className="h-5 w-5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </Button>

      {/* Status messages */}
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={cn(
              'rounded-lg border p-4 text-center',
              'border-success/30 bg-success/10 text-success'
            )}
            role="status"
          >
            <p className="font-medium">Message sent successfully!</p>
            <p className="mt-1 text-sm opacity-80">
              I&apos;ll get back to you within 24-48 hours.
            </p>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={cn(
              'rounded-lg border p-4 text-center',
              'border-error/30 bg-error/10 text-error'
            )}
            role="alert"
          >
            <p className="font-medium">Something went wrong</p>
            <p className="mt-1 text-sm opacity-80">
              Please try again or email me directly at hello@jernadigital.com
            </p>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="mt-2 text-sm underline hover:no-underline"
            >
              Try again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
