"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Popover from "@radix-ui/react-popover";
import { useRouter } from "next/navigation";
import { MdAdd } from "react-icons/md";

import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { onCreateProject } from "@/actions/query-actions";
import { reactQueryKeys } from "@/lib/react-query-keys";
import { toast } from "react-toastify";
import { useState } from "react";

interface AddProjectInput {
  projectName: string;
  projectDescription: string;
}

export default function AddProjectPopover({ userId }: { userId: string }) {
  const route = useRouter();
  const [openPop, setOpenPop] = useState(false);
  const queryClient = useQueryClient();
  const { register, handleSubmit, watch, reset } = useForm<AddProjectInput>();

  const addProjectAction = useMutation({
    mutationFn: onCreateProject,
    mutationKey: [reactQueryKeys.addProject],
  });

  const onSubmit: SubmitHandler<AddProjectInput> = async (data) => {
    if (data.projectName === "") {
      toast.warning("missing project name");
      return;
    }

    const res = await addProjectAction.mutateAsync({
      description: data.projectDescription,
      projectName: data.projectName,
      projectId: "",
      createAt: Date.now(),
    });

    if (res?.status) {
      toast.success("Create project successfull");
      queryClient.refetchQueries({
        queryKey: [reactQueryKeys.projectList],
      });
      route.push(`/project/${res?.data?.projectId}`);
      setOpenPop(false);
      reset();
    }
  };

  return (
    <Popover.Root open={openPop}>
      <Popover.Trigger onClick={() => setOpenPop((prev) => !prev)}>
        <div className="h-10 w-10 rounded-md bg-blue-400 flex justify-center items-center text-white font-medium">
          <MdAdd className="w-6 h-6" />
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="right"
          className="translate-x-5 translate-y-20 z-10 bg-blue-50 flex border rounded-md p-4"
        >
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name-project" className="flex flex-col gap-1">
                <p className="text-xs font-medium">Project Name</p>
                <Input
                  {...register("projectName")}
                  type="text"
                  id="name-project"
                />
              </label>
              <label htmlFor="name-project" className="flex flex-col gap-1">
                <p className="text-xs font-medium">Description</p>
                <Input
                  {...register("projectDescription")}
                  type="text"
                  id="description-project"
                />
              </label>
            </div>
            <Button type="submit">Add Project</Button>
          </form>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
