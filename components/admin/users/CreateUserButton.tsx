import React from "react";
import { useFormStatus } from "react-dom";

function CreateUserButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} type="submit" className="w-full rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50">
      {pending ? "User creating ... " : "Create User"}
    </button>
  );
}

export default CreateUserButton;
