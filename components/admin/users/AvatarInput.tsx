"use client";

import { ChangeEvent, useEffect, useState } from "react";

type AvatarInputProps = {
  initialImage?: string | null;
};

export default function AvatarInput({ initialImage = null }: AvatarInputProps) {
  const [preview, setPreview] = useState<string | null>(initialImage);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setPreview(initialImage);
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div>
      <label
        htmlFor="avatar"
        className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
      >
        Avatar
      </label>

      <div className="flex items-center gap-5">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
          {preview ? (
            <img
              src={preview}
              alt="Avatar preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-sm text-slate-400">No image</span>
          )}
        </div>

        <div className="flex-1">
          <input
            id="avatar"
            name="avatar"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleChange}
            className="block w-full cursor-pointer text-sm text-slate-500
              file:mr-4 file:rounded-lg file:border-0
              file:bg-indigo-50 file:px-4 file:py-2
              file:text-sm file:font-medium file:text-indigo-700
              hover:file:bg-indigo-100
              dark:text-slate-400
              dark:file:bg-indigo-950
              dark:file:text-indigo-300"
          />

          <p className="mt-2 text-xs text-slate-400">
            JPG, PNG yoki WebP. Maximum 5MB.
          </p>
        </div>
      </div>
    </div>
  );
}
