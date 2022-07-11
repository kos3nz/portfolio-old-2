import Link from "next/link";

import Image from "components/image";
import Loader from "components/loader";

const ProjectCard: React.FunctionComponent<{
  project: {
    title: string;
    path: string;
    imgUrl: string;
  };
}> = ({ project }) => (
  <Link href={project.path}>
    <a className="group w-full max-w-sm outline-none">
      <div className="overflow-hidden">
        <div className="duration-300 group-hover:opacity-80">
          <Image
            src={project.imgUrl}
            alt={project.title}
            height={9}
            width={16}
            Loader={<Loader />}
          />
        </div>
      </div>
      <div className="flex items-center border-b-2 border-base-content/30 pt-2">
        <div className="flex-1">
          <h3 className="mb-1 text-lg font-bold text-base-content">
            {project.title}
          </h3>
        </div>
        <div>
          <button
            tabIndex={-1}
            title="See this project"
            aria-label="See this project"
            className="mx-auto block rounded-full p-2 text-sm text-base-content"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <line x1="15" y1="16" x2="19" y2="12"></line>
              <line x1="15" y1="8" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>
      <span className="-mt-[2px] block h-[2px] w-full scale-x-0 bg-primary duration-300 group-hover:scale-x-100 group-focus:scale-x-100" />
    </a>
  </Link>
);

export default ProjectCard;
