import { config } from "@/config/configuration";
import type { DomainEntity } from "@/types/domainTypes";

type AboutProp = {
  domainDetails: Omit<DomainEntity, "isBlocked">;
};
const DomainAbout = ({ domainDetails }: AboutProp) => {
  const domainImage = domainDetails.image || "/mern-logo.png";

  return (
    <div>
      <section className="bg-[#222] text-white pt-10 pb-0">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-12 px-6">
          <img
            src={config.IMAGE_BASE_URL+domainImage}
            alt={
              domainDetails.name.length > 10
                ? domainDetails.name.substring(0, 10)
                : domainDetails.name
            }
            className="w-[220px] h-[220px] rounded-full bg-[#222] object-cover mb-6"
          />
          <div className="flex-1">
            <h2 className="font-medium text-xl mb-4">
              Unlock the power of modern web development by mastering{" "}
              <b>{domainDetails.name}</b>. This hands-on course takes you from
              the basics to building real-world full-stack applications. Whether
              you're starting your career or upskilling for the next big
              opportunity, this is your all-in-one roadmap to becoming a{" "}
              {domainDetails.name} pro.
            </h2>
          </div>
        </div>
      </section>

      {/* What is Domain */}
      <section className="bg-[#eee] py-8">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h1 className="font-bold text-3xl mb-6">
            What is {domainDetails.name}?
          </h1>
          <p className="font-bold text-lg mb-6 break-words">
            {domainDetails.description}
          </p>
        </div>
      </section>

      {/* Why Should You Learn */}
      <section className="bg-[#f7f7f7] py-8">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-bold text-2xl text-center mb-6">
            Why Should You Learn {domainDetails.name}?
          </h2>
          <p className="text-center break-words">{domainDetails.motive}</p>
        </div>
      </section>
    </div>
  );
};

export default DomainAbout