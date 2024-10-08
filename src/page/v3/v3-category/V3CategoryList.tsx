import { Button } from "@/components/ui/button";
import { FaPenToSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";
import V3CategoryDelDialog from "./V3CategoryDelDialog";
import { V3Categories } from "@/hooks/useV3";

export default function V3CategoryList({ item }: { item: V3Categories }) {
  return (
    <div className="group relative border p-2 rounded-lg overflow-hidden">
      <div className="grid grid-cols-2">
        <div>{item.name}</div>
      </div>
      <div className="scale-0 group-hover:scale-100 origin-right transition absolute flex gap-1 right-0 top-1/2 -translate-y-1/2 p-2">
        <Button size={"sm"} variant={"outline"} asChild>
          <Link to={`/v3-mongodb/category-update/${item._id}`}>
            <FaPenToSquare className="text-green-500" />
          </Link>
        </Button>
        <V3CategoryDelDialog item={item} />
      </div>
    </div>
  );
}
