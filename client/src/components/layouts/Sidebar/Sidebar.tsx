"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import AddProjectPopover from "./AddProjectPopover";
import { handleUserProjectList } from "@/actions/query-actions";
import { reactQueryKeys } from "@/lib/react-query-keys";
import ProjectItemOption from "./ProjectItemOption";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@chakra-ui/react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import useScreenView from "@/hooks/ScreenView";

export interface ProjectListItem {
  description: string;
  projectName: string;
  projectId: string;
  createAt: number;
  dueTime: number;
}

export interface ProjectSelectProps {
  item: ProjectListItem;
}

function ProjectSelect({ item }: ProjectSelectProps) {
  const route = useRouter();
  const params = useParams();
  const ProjectSelected = params?.projectId === item.projectId;

  const onSelectProject = async () => {
    route.push(`/project/${item.projectId}`);
  };

  return (
    <div className="wrappper relative group">
      <div
        className={cn(
          "flex justify-between w-full items-center px-4 py-2 group-hover:bg-blue-100 cursor-pointer",
          ProjectSelected &&
            "bg-blue-400 text-white group-hover:bg-blue-300 group-hover:text-blue-800"
        )}
        onClick={onSelectProject}
      >
        <p className="font-medium">{item.projectName}</p>
      </div>
      <div
        className={cn(
          "absolute top-[50%] -translate-y-1/2 right-5 group-hover:bg-blue-100 hover:!bg-blue-300 rounded-md",
          ProjectSelected &&
            "bg-blue-400 text-white group-hover:bg-blue-300 group-hover:text-blue-800 hover:!bg-blue-400"
        )}
      >
        <ProjectItemOption itemData={item} />
      </div>
    </div>
  );
}

export default function Sidebar({
  userId,
  projectId,
}: {
  userId: string;
  projectId: string;
}) {
  const { screenView } = useScreenView();
  const [openSidebar, setOpenSidebar] = useState(true);

  useEffect(() => {
    if (screenView) {
      setOpenSidebar(Number(screenView) > 1024);
    }
  }, [screenView]);

  const queryUserProjectList = useQuery({
    queryKey: [reactQueryKeys.projectList],
    queryFn: handleUserProjectList,
  });

  const userProjectList: ProjectListItem[] = useMemo(() => {
    const data: ProjectListItem[] =
      (queryUserProjectList && queryUserProjectList.data?.data.data) ?? [];

    const formatDataUserProjectList = data.sort(
      (a, b) => b?.dueTime - a?.dueTime
    );

    return formatDataUserProjectList;
  }, [queryUserProjectList]);

  const projectName = useMemo(() => {
    return (
      userProjectList.find((item) => item?.projectId === projectId)
        ?.projectName ?? []
    );
  }, [projectId, userProjectList]);

  return (
    <div
      className={cn(
        openSidebar ? "max-lg:w-[300px] max-lg:sm:w-[400px]" : "w-[16px]",
        "relative col-span-2 lg:flex flex-shrink-0 flex-col bg-blue-200 transition-all duration-300"
      )}
    >
      {openSidebar && (
        <div className="flex justify-between items-center gap-2 px-4 py-2">
          <div className="flex items-center gap-2">
            <Image
              src="/default-avatar.webp"
              alt="avatar"
              height={40}
              width={40}
              className="w-8 h-8 object-contain rounded-full"
            />
            <h2 className="font-medium text-lg overflow-hidden whitespace-nowrap">
              {projectName}
            </h2>
          </div>
          {Number(screenView) < 1024 && (
            <button
              className="flex justify-center items-center bg-blue-200 hover:bg-blue-100 text-blue-900 p-3 rounded-md"
              onClick={() => setOpenSidebar(false)}
            >
              <MdArrowBackIosNew className="w-3 h-3 font-medium" />
            </button>
          )}
        </div>
      )}

      {!openSidebar && (
        <button
          className="absolute flex justify-center items-center -right-[14px] top-[12px] z-50 bg-blue-500 text-white p-2 rounded-full"
          onClick={() => setOpenSidebar(true)}
        >
          <MdArrowForwardIos className="w-4 h-4 font-medium rounded-full" />
        </button>
      )}

      {openSidebar && (
        <div className="flex flex-col gap-2 h-[calc(100%-55px)] py-2">
          <div className="flex items-center justify-between px-4">
            <h3 className="font-semibold overflow-hidden whitespace-nowrap">
              Project List
            </h3>
            <AddProjectPopover userId={userId} />
          </div>
          <div className="flex flex-col overflow-hidden whitespace-nowrap">
            {queryUserProjectList.isLoading ? (
              <Skeleton height="60px" />
            ) : (
              userProjectList.map((item: ProjectListItem, index: number) => {
                return <ProjectSelect item={item} key={index} />;
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
