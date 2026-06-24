"use client";

import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  pendingText: string;
  actionText: string;
  formAction?: (formData: FormData) => void | Promise<void>;
  className?: string;
  disabled?: boolean;
}

export function SubmitButton({
  pendingText,
  actionText,
  formAction,
  className,
  disabled = false,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      formAction={formAction}
      disabled={pending || disabled}
      className={
        className ??
        "w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 text-sm"
      }
    >
      {pending ? pendingText : actionText}
    </button>
  );
}
