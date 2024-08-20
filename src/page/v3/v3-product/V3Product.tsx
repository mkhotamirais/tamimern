import { Err, LoaderBounce } from "@/components/Wrapper";
import { useEffect } from "react";
import V3ProductList from "./V3ProductList";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useV3 } from "@/hooks/useV3";

export default function V3Product() {
  const { data, getData, loadData, errData } = useV3();

  useEffect(() => {
    getData();
  }, [getData]);

  let content;
  if (loadData) {
    content = <LoaderBounce />;
  } else if (errData) {
    content = <Err>{errData}</Err>;
  } else {
    content = (
      <>
        {data.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {data?.map((item) => (
              <V3ProductList key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center italic">Data empty</div>
        )}
      </>
    );
  }

  return (
    <div className="mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold my-3">Product List</h2>
        <Button size={"sm"} asChild>
          <Link to="/v3/product-create">Add New</Link>
        </Button>
      </div>

      {content}
    </div>
  );
}
