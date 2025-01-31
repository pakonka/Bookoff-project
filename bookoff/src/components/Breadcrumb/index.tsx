import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";

interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrent?: boolean;
}

const Breadcrumb: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {/* If it's not the current page, render a clickable link */}
            {!item.isCurrent ? (
              <div className="flex gap-1 items-center">
                <Link
                  href={item.href}
                  className="text-customBlue hover:underline"
                >
                  {item.label}
                </Link>
                <MdKeyboardArrowRight className="text-[#cccccc] text-[20px] " />
              </div>
            ) : (
              // If it's the current page, just render text
              <span className="">{item.label}</span>
            )}
            {/* Render the ">" separator if it's not the last item */}
            {index < items.length - 1 && <span className="mx-2"></span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
