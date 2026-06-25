import { SubmitButton } from "@/components/applications/forms/SubmitButton";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("SubmitButton", () => {
  it("should show the text when it is not in pending state", () => {
    render(
      <form>
        <SubmitButton actionText="Send" pendingText="Sending..." />
      </form>,
    );

    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("should show the pending state text with action is exectued", async () => {
    const slowAction = async () => {
      new Promise((resolve) => setTimeout(resolve, 1000));
    };

    render(
      <form action={slowAction}>
        <SubmitButton actionText="Save" pendingText="Saving..." />
      </form>,
    );

    const button = screen.getByRole("button");

    button.click();

    await waitFor(() => {
      expect(button).toBeDisabled();
      expect(screen.getByText("Saving...")).toBeInTheDocument();
    });
  });
});
