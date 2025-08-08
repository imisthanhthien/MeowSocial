import { useState, useRef, useEffect } from 'react';

export default function CommentMenu({ commentId }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDelete = () => {
    setOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setOpen(!open)} className="text-gray-500 hover:text-black">
        ⋮
      </button>

      {open && (
        <div className="absolute right-0 mt-1 bg-white border rounded shadow z-10 w-24">
          <button
            onClick={handleDelete}
            className="block w-full text-left px-2 py-1 text-sm text-red-500 hover:bg-gray-100"
          >
            Xoá
          </button>
        </div>
      )}
    </div>
  );
}
