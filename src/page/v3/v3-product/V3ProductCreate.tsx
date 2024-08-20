import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { url } from "@/lib/constants";
import { useNavigate } from "react-router-dom";
import { ProductSchema } from "../v3Schemas";
import { useV3 } from "@/hooks/useV3";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Err, LoaderBounce } from "@/components/Wrapper";

type CreateProductForm = z.infer<typeof ProductSchema>;

export default function V3ProductCreate() {
  const [pending, startTransition] = useTransition();
  const { cat, tag, getCat, getTag, loadCat, loadTag, errCat, errTag } = useV3();

  const form = useForm<CreateProductForm>({
    resolver: zodResolver(ProductSchema),
    defaultValues: { name: "", price: "", category: "", tag: [], description: "" },
  });
  const navigate = useNavigate();

  const onSubmit = async (values: CreateProductForm) => {
    console.log(values);
    startTransition(() => {
      axios
        .create({ withCredentials: true })
        .post(`${url}/v3/product`, values)
        .then((res) => {
          toast.success(res.data.message);
          navigate("/v3/product");
        })
        .catch((err) => {
          toast.error(err.response.data.error || err.message);
        });
    });
  };

  useEffect(() => {
    getCat();
    getTag();
  }, [getCat, getTag]);

  if (loadCat && loadTag) return <LoaderBounce />;
  if (errCat && errTag)
    return (
      <Err>
        {errCat} - {errTag}
      </Err>
    );

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-lg font-semibold my-3">Create Product</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={pending} {...field} placeholder="Product name" onFocus={(e) => e.target.select()} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    disabled={pending}
                    {...field}
                    placeholder="Product price"
                    type="number"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    onFocus={(e) => e.target.select()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={pending}
                    {...field}
                    placeholder="Product description"
                    onFocus={(e) => e.target.select()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cat.map((item) => (
                        <SelectItem key={item?._id} value={item?._id}>
                          {item?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tag"
            render={() => (
              <FormItem>
                <FormLabel>Tag</FormLabel>
                {tag.map((item) => (
                  <FormField
                    key={item?._id}
                    control={form.control}
                    name="tag"
                    render={({ field }) => {
                      return (
                        <FormItem key={item?._id} className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item?._id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([...field.value, item?._id]);
                                } else {
                                  field.onChange(field.value?.filter((value) => value !== item?._id));
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{item?.name}</FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={pending} type="submit">
            {pending ? "Loading.." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
