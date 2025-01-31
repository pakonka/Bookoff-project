export const getStatusClass = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'border border-[#f59e0b] text-[#f59e0b]'; // Màu vàng (#f59e0b)
      case 'Shipped':
        return 'border border-[#2563eb] text-[#2563eb]';  // Màu xanh dương (#2563eb)
      case 'Delivered':
        return 'border border-[#10b981] text-[#10b981]'; // Màu xanh lá (#10b981)
      case 'Canceled':
        return 'border border-[#ef4444] text-[#ef4444]';   // Màu đỏ (#ef4444)
      default:
        return 'border border-[#6b7280] text-[#6b7280]';  // Màu xám (#6b7280) cho trạng thái không xác định
    }
  };
