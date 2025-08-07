export default function PostDetail() {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="flex items-center gap-3 mb-2">
        <img src="https://placekitten.com/40/40" alt="Avatar" className="rounded-full w-10 h-10" />
        <div>
          <p className="font-semibold">Meo Meo</p>
          <p className="text-sm text-gray-500">3 giờ trước</p>
        </div>
      </div>
      <p className="mb-2">Chi tiết bài viết về chú mèo dễ thương này.</p>
      <img src="https://placekitten.com/400/300" alt="Meow detail" className="rounded-xl mb-2" />
      <p className="text-sm text-gray-700 mt-3">💬 Bình luận (4)</p>
    </div>
  );
}
