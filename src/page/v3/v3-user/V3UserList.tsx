import { Button } from "@/components/ui/button";
import { FaPenToSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { V3Users } from "@/hooks/useV3";
import V3UserDelDialog from "./V3UserDelDialog";
import { Badge } from "@/components/ui/badge";

export default function V3UserList({ item }: { item: V3Users }) {
  return (
    <div className="group relative border p-2 rounded-lg overflow-hidden">
      <div className="grid grid-cols-2">
        <div className="flex space-x-1">
          <div className="capitalize">{item.name}</div>
          <Badge>{item.role}</Badge>
        </div>
        <div>{item.email}</div>
      </div>
      <div className="scale-0 group-hover:scale-100 origin-right transition absolute flex gap-1 right-0 top-1/2 -translate-y-1/2 p-2">
        <Button size={"sm"} variant={"outline"} asChild>
          <Link to={`/v3-mysql/user-update/${item._id}`}>
            <FaPenToSquare className="text-green-500" />
          </Link>
        </Button>
        <V3UserDelDialog item={item} />
      </div>
    </div>
  );
}
