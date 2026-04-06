"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import CharacterCount from "@tiptap/extension-character-count";
import { Bold, Italic, Underline as UnderlineIcon, Strikethrough, Heading1, Heading2, Heading3, Highlighter, List, ListOrdered, Quote, Code, Image as ImageIcon, Link as LinkIcon, AlignLeft, AlignCenter, AlignRight, AlignJustify, Undo, Redo, RemoveFormatting } from "lucide-react";
import styles from "./BlogEditor.module.css";
import { useEffect } from "react";

const Toolbar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbarGroup}>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`${styles.toolbarBtn} ${editor.isActive("heading", { level: 1 }) ? styles.active : ""}`} title="Heading 1"><Heading1 size={16} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`${styles.toolbarBtn} ${editor.isActive("heading", { level: 2 }) ? styles.active : ""}`} title="Heading 2"><Heading2 size={16} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`${styles.toolbarBtn} ${editor.isActive("heading", { level: 3 }) ? styles.active : ""}`} title="Heading 3"><Heading3 size={16} /></button>
      </div>

      <div className={styles.toolbarDivider} />

      <div className={styles.toolbarGroup}>
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`${styles.toolbarBtn} ${editor.isActive("bold") ? styles.active : ""}`} title="Bold"><Bold size={16} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`${styles.toolbarBtn} ${editor.isActive("italic") ? styles.active : ""}`} title="Italic"><Italic size={16} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={`${styles.toolbarBtn} ${editor.isActive("underline") ? styles.active : ""}`} title="Underline"><UnderlineIcon size={16} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={`${styles.toolbarBtn} ${editor.isActive("strike") ? styles.active : ""}`} title="Strikethrough"><Strikethrough size={16} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleHighlight().run()} className={`${styles.toolbarBtn} ${editor.isActive("highlight") ? styles.active : ""}`} title="Highlight"><Highlighter size={16} /></button>
      </div>

      <div className={styles.toolbarDivider} />

      <div className={styles.toolbarGroup}>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={`${styles.toolbarBtn} ${editor.isActive({ textAlign: 'left' }) ? styles.active : ""}`} title="Align Left"><AlignLeft size={16} /></button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={`${styles.toolbarBtn} ${editor.isActive({ textAlign: 'center' }) ? styles.active : ""}`} title="Align Center"><AlignCenter size={16} /></button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={`${styles.toolbarBtn} ${editor.isActive({ textAlign: 'right' }) ? styles.active : ""}`} title="Align Right"><AlignRight size={16} /></button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={`${styles.toolbarBtn} ${editor.isActive({ textAlign: 'justify' }) ? styles.active : ""}`} title="Align Justify"><AlignJustify size={16} /></button>
      </div>

       <div className={styles.toolbarDivider} />

      <div className={styles.toolbarGroup}>
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`${styles.toolbarBtn} ${editor.isActive("bulletList") ? styles.active : ""}`} title="Bullet List"><List size={16} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`${styles.toolbarBtn} ${editor.isActive("orderedList") ? styles.active : ""}`} title="Ordered List"><ListOrdered size={16} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`${styles.toolbarBtn} ${editor.isActive("blockquote") ? styles.active : ""}`} title="Blockquote"><Quote size={16} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={`${styles.toolbarBtn} ${editor.isActive("codeBlock") ? styles.active : ""}`} title="Code Block"><Code size={16} /></button>
      </div>

      <div className={styles.toolbarDivider} />
      
      <div className={styles.toolbarGroup}>
        <button type="button" onClick={() => {
            const url = window.prompt("URL");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }} className={`${styles.toolbarBtn} ${editor.isActive("link") ? styles.active : ""}`} title="Link"><LinkIcon size={16} /></button>
        <button type="button" onClick={() => {
            const url = window.prompt("Image URL");
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }} className={styles.toolbarBtn} title="Image"><ImageIcon size={16} /></button>
      </div>

      <div className={styles.toolbarDivider} />

      <div className={styles.toolbarGroup}>
         <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()} className={styles.toolbarBtn} title="Undo"><Undo size={16} /></button>
         <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()} className={styles.toolbarBtn} title="Redo"><Redo size={16} /></button>
         <button type="button" onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()} className={styles.toolbarBtn} title="Clear Formatting"><RemoveFormatting size={16} /></button>
      </div>
    </div>
  );
};

const BlogEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Underline,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: 'Write your blog content...',
      }),
      CharacterCount,
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value && editor.getHTML() !== value) {
      setTimeout(() => {
        if(editor.getHTML() !== value) {
           editor.commands.setContent(value, false);
        }
      }, 0);
    }
  }, [value, editor]);

  return (
    <div className={styles.editorContainer}>
      <Toolbar editor={editor} />
      <div className={styles.editorContentWrapper}>
         <EditorContent editor={editor} className={styles.editorContent} />
      </div>
      {editor && (
        <div className={styles.editorFooter}>
          {editor.storage.characterCount.words()} words
        </div>
      )}
    </div>
  );
};

export default BlogEditor;
