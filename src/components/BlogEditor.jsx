
"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import styles from "./BlogEditor.module.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const BlogEditor = ({ value, onChange }) => {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote", "code-block"],
        ["link", "image"],
        ["clean"],
      ],
    }),
    []
  );

  const formats = useMemo(
    () => [
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "list",
      "blockquote",
      "code-block",
      "link",
      "image",
    ],
    []
  );

  return (
    <div className={styles.editor}>
      <ReactQuill
        theme="snow"
        value={value || ""}
        onChange={(content) => onChange?.(content)}
        modules={modules}
        formats={formats}
        placeholder="Write your blog content..."
        className={styles.content}
      />
    </div>
  );
};

export default BlogEditor;
