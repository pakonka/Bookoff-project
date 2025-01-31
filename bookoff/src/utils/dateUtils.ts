export const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return "日付情報がありません"; // Kiểm tra nếu không có giá trị
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };
  