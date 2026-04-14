"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/* ─── Types ─── */

export interface FileEntry {
  name: string;
  filename: string;
  description: string;
  downloadUrl: string;
  readContent?: string;
  detail?: {
    why: string;
    how: string;
    invoke?: string;
    dependencies?: string;
    links?: { label: string; url: string }[];
  };
}

export interface FolderEntry {
  type: "folder";
  name: string;
  description: string;
  children: TreeNode[];
}

export interface FileNode {
  type: "file";
  entry: FileEntry;
}

export type TreeNode = FolderEntry | FileNode;

/* ─── Icons ─── */

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? "w-4 h-4"}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
  );
}

/* ─── Markdown modal ─── */

const mdComponents = {
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="text-2xl font-bold text-white mt-8 mb-3 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="text-xl font-bold text-white mt-7 mb-2 pb-1 border-b border-gray-800">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="text-lg font-semibold text-white mt-5 mb-1">
      {children}
    </h3>
  ),
  h4: ({ children }: { children?: React.ReactNode }) => (
    <h4 className="text-base font-semibold text-gray-200 mt-4 mb-1">
      {children}
    </h4>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-gray-300 leading-relaxed mb-3">{children}</p>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="text-white font-semibold">{children}</strong>
  ),
  em: ({ children }: { children?: React.ReactNode }) => (
    <em className="text-gray-400 italic">{children}</em>
  ),
  a: ({
    href,
    children,
  }: {
    href?: string;
    children?: React.ReactNode;
  }) => (
    <a
      href={href}
      target="_blank"
      className="text-[#6CACE4] hover:underline"
    >
      {children}
    </a>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="text-gray-300 space-y-1 mb-3 ml-4 list-disc list-outside">
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="text-gray-300 space-y-1 mb-3 ml-4 list-decimal list-outside">
      {children}
    </ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="text-gray-300 leading-relaxed">{children}</li>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="border-l-2 border-[#6CACE4] pl-4 my-3 text-gray-400 italic">
      {children}
    </blockquote>
  ),
  code: ({
    className,
    children,
  }: {
    className?: string;
    children?: React.ReactNode;
  }) => {
    if (className?.includes("language-")) {
      return <code className="text-gray-300 text-sm">{children}</code>;
    }
    return (
      <code className="text-[#6CACE4] bg-gray-800/50 px-1.5 py-0.5 text-sm rounded">
        {children}
      </code>
    );
  },
  pre: ({ children }: { children?: React.ReactNode }) => (
    <pre className="bg-gray-900/80 border border-gray-800 p-4 overflow-x-auto mb-3 text-sm">
      {children}
    </pre>
  ),
  hr: () => <hr className="border-gray-800 my-6" />,
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="overflow-x-auto mb-3">
      <table className="w-full text-sm text-gray-300 border-collapse">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: { children?: React.ReactNode }) => (
    <thead className="border-b border-gray-700 text-white">{children}</thead>
  ),
  th: ({ children }: { children?: React.ReactNode }) => (
    <th className="text-left px-3 py-2 font-semibold">{children}</th>
  ),
  td: ({ children }: { children?: React.ReactNode }) => (
    <td className="px-3 py-2 border-b border-gray-800">{children}</td>
  ),
};

function Modal({
  file,
  onClose,
}: {
  file: FileEntry;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 bg-black/85 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-gray-950 border border-gray-800 w-full max-w-4xl mb-16"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-gray-900/80 border-b border-gray-800 sticky top-0 z-10">
          <span className="font-mono text-sm text-gray-300">
            {file.name && (
              <span className="text-yellow-600/80">{file.name}/</span>
            )}
            {file.filename}
          </span>
          <div className="flex items-center gap-4">
            <a
              href={file.downloadUrl}
              className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#6CACE4] transition-colors"
            >
              <DownloadIcon className="w-3.5 h-3.5" />
              Download
            </a>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-white transition-colors text-xl leading-none px-1"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 sm:px-10 sm:py-8 text-sm">
          {file.readContent ? (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={mdComponents}
            >
              {file.readContent}
            </ReactMarkdown>
          ) : file.detail ? (
            <>
              <p className="text-gray-400 mb-5">{file.description}</p>
              <div className="mb-4">
                <span className="text-[#6CACE4] text-xs font-semibold uppercase tracking-wider">
                  Why
                </span>
                <p className="text-gray-300 leading-relaxed mt-1">
                  {file.detail.why}
                </p>
              </div>
              <div className="mb-4">
                <span className="text-[#6CACE4] text-xs font-semibold uppercase tracking-wider">
                  How
                </span>
                <p className="text-gray-300 leading-relaxed mt-1">
                  {file.detail.how}
                </p>
              </div>
              {file.detail.invoke && (
                <div className="mb-4">
                  <code className="text-[#6CACE4] bg-black border border-gray-800 px-2 py-1 text-xs">
                    {file.detail.invoke}
                  </code>
                </div>
              )}
              {file.detail.dependencies && (
                <div className="mb-4 bg-yellow-900/15 border border-yellow-800/40 px-3 py-2">
                  <p className="text-yellow-200/70 text-xs">
                    {file.detail.dependencies}
                  </p>
                </div>
              )}
              {file.detail.links?.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  className="text-[#6CACE4] text-xs hover:underline block mb-1"
                >
                  {link.label} →
                </a>
              ))}
            </>
          ) : (
            <p className="text-gray-400">{file.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── File row ─── */

function FileRow({
  file,
  prefix,
  continuationPrefix,
  onRead,
}: {
  file: FileEntry;
  prefix: string;
  continuationPrefix: string;
  onRead: (f: FileEntry) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasDetail = !!file.detail;

  return (
    <>
      <div className="flex items-center group min-h-[28px] hover:bg-gray-900/50 -mx-1 px-1">
        <span className="text-gray-700 font-mono text-sm whitespace-pre shrink-0 select-none">
          {prefix}
        </span>
        <button
          onClick={() => hasDetail && setExpanded(!expanded)}
          className={`font-mono text-sm truncate text-left ${
            hasDetail ? "cursor-pointer" : "cursor-default"
          } transition-colors`}
        >
          {file.name && (
            <span className="text-yellow-600/80">{file.name}/</span>
          )}
          <span className="text-gray-500">{file.filename}</span>
        </button>
        <span className="text-gray-700 font-mono text-sm mx-2 shrink-0 select-none hidden sm:inline">
          ─
        </span>
        <span className="text-gray-600 text-xs hidden sm:inline truncate">
          {file.description}
        </span>
        <div className="flex items-center gap-3 shrink-0 ml-auto pl-3">
          <button
            onClick={() => onRead(file)}
            className="text-gray-600 text-xs hover:text-[#6CACE4] transition-colors"
          >
            read
          </button>
          <a
            href={file.downloadUrl}
            className="text-gray-600 hover:text-[#6CACE4] transition-colors"
            title={`Download ${file.name || file.filename}`}
            onClick={(e) => e.stopPropagation()}
          >
            <DownloadIcon />
          </a>
        </div>
      </div>

      {/* Inline expanded why/how */}
      {expanded && file.detail && (
        <div className="flex min-h-0">
          <span className="text-gray-700 font-mono text-sm whitespace-pre shrink-0 select-none">
            {continuationPrefix}
          </span>
          <div className="border-l border-gray-800 pl-4 py-2 mb-1 text-sm">
            <p className="text-gray-500 text-xs mb-2 sm:hidden">
              {file.description}
            </p>
            <p className="text-gray-400 leading-relaxed mb-2">
              {file.detail.why}
            </p>
            {file.detail.invoke && (
              <code className="text-[#6CACE4] bg-black border border-gray-800 px-2 py-0.5 text-xs">
                {file.detail.invoke}
              </code>
            )}
            {file.detail.dependencies && (
              <p className="text-yellow-200/60 text-xs mt-2">
                {file.detail.dependencies}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

/* ─── Recursive tree renderer ─── */

function TreeNodes({
  nodes,
  parentPrefix,
  onRead,
  openFolders,
  toggleFolder,
}: {
  nodes: TreeNode[];
  parentPrefix: string;
  onRead: (f: FileEntry) => void;
  openFolders: Record<string, boolean>;
  toggleFolder: (name: string) => void;
}) {
  return (
    <>
      {nodes.map((node, i) => {
        const isLast = i === nodes.length - 1;
        const connector = isLast ? "└── " : "├── ";
        const continuation = isLast ? "    " : "│   ";
        const prefix = parentPrefix + connector;
        const childPrefix = parentPrefix + continuation;

        if (node.type === "file") {
          return (
            <FileRow
              key={node.entry.name || node.entry.filename}
              file={node.entry}
              prefix={prefix}
              continuationPrefix={childPrefix}
              onRead={onRead}
            />
          );
        }

        const folder = node;
        const isOpen = openFolders[folder.name] ?? false;

        return (
          <div key={folder.name}>
            <div className="flex items-center min-h-[28px] hover:bg-gray-900/50 -mx-1 px-1">
              <span className="text-gray-700 font-mono text-sm whitespace-pre shrink-0 select-none">
                {prefix}
              </span>
              <button
                onClick={() => toggleFolder(folder.name)}
                className="font-mono text-sm text-[#6CACE4] hover:text-white transition-colors cursor-pointer"
              >
                {folder.name}/
              </button>
              <span className="text-gray-600 text-xs ml-3">
                {folder.description}
              </span>
            </div>

            {isOpen && (
              <TreeNodes
                nodes={folder.children}
                parentPrefix={childPrefix}
                onRead={onRead}
                openFolders={openFolders}
                toggleFolder={toggleFolder}
              />
            )}
          </div>
        );
      })}
    </>
  );
}

/* ─── Main component ─── */

export default function SkillsTree({ entries }: { entries: TreeNode[] }) {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    skills: true,
    orchestration: true,
    education: true,
    corrections: true,
    docs: true,
  });
  const [modalFile, setModalFile] = useState<FileEntry | null>(null);

  const toggleFolder = (name: string) =>
    setOpenFolders((prev) => ({ ...prev, [name]: !prev[name] }));

  return (
    <>
      <div className="bg-gray-950 border border-gray-800 rounded overflow-hidden">
        {/* Terminal title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-900/80 border-b border-gray-800">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <span className="text-gray-500 text-xs font-mono ml-2">
            ~/.claude
          </span>
        </div>

        {/* Tree */}
        <div className="p-4 sm:p-6 overflow-x-auto">
          <div className="font-mono text-sm text-gray-400 mb-0.5 select-none">
            .
          </div>
          <TreeNodes
            nodes={entries}
            parentPrefix=""
            onRead={setModalFile}
            openFolders={openFolders}
            toggleFolder={toggleFolder}
          />
        </div>
      </div>

      {modalFile && (
        <Modal file={modalFile} onClose={() => setModalFile(null)} />
      )}
    </>
  );
}
