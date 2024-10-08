import { z } from "zod";

import { useV3 } from "@/hooks/useV3";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UpdateUserSchema } from "../v3Schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Err, LoaderBounce } from "@/components/Wrapper";
import axios from "axios";
import { url } from "@/lib/constants";
import { toast } from "sonner";

type UpdateUserForm = z.infer<typeof UpdateUserSchema>;

export default function V3UserUpdate() {
  const { id } = useParams();
  const { getUser, user, loadUser, errUser } = useV3();
  const [pending, setPending] = useState(false);
  const [changePass, setChangePass] = useState(false);
  const navigate = useNavigate();

  const form = useForm<UpdateUserForm>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: { name: "", email: "", password: "", confPassword: "", role: user?.role },
  });

  useEffect(() => {
    if (id) {
      getUser(id);
    }
  }, [getUser, id]);

  useEffect(() => {
    if (user) {
      const { name, email, role } = user;
      form.reset({ name, email, password: "", confPassword: "", role });
    }
  }, [user, form]);

  const onSubmit = (values: UpdateUserForm) => {
    setPending(true);
    axios
      .create({ withCredentials: true })
      .patch(`${url}/v3/user/${id}`, values)
      .then((res) => {
        toast.success(res.data.message);
        navigate("/v3-mongodb/user");
      })
      .catch((err) => {
        toast.error(err.response.data.error || err.message);
      })
      .finally(() => setPending(false));
  };

  let content;
  if (loadUser) content = <LoaderBounce />;
  else if (errUser) content = <Err>{errUser}</Err>;
  else
    content = (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={pending} {...field} placeholder="your name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" disabled={pending} {...field} placeholder="example@gmail.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={pending}
            onClick={() => setChangePass((prev) => !prev)}
            type="button"
            variant={"outline"}
            size={"sm"}
          >
            Change Password
          </Button>
          <div className={`${changePass ? "block" : "hidden"} transition space-y-3`}>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" disabled={pending} {...field} placeholder="******" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" disabled={pending} {...field} placeholder="******" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  disabled={pending}
                  value={field.value}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose Role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={pending} type="submit">
            {pending ? "Loading.." : "Save"}
          </Button>
        </form>
      </Form>
    );

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-lg font-semibold my-3">Update User</h2>
      {content}
    </div>
  );
}
