import { Link } from "react-router-dom";
import camelLogo from "../assets/Camel-Logo-2.png";
import { Routes } from "../constants/enums";

import AccordionItem from "../components/AccordionCom";

export default function About() {
  const accordionArr = [
    {
      title:
        "What data is the language model trained on to assist the customer service team?",
      content:
        "Answer: The language model is trained on all company ticketing data.",
    },
    {
      title:
        "Answer: The language model improves efficiency by answering inquiries and routing them to the appropriate team, allowing the customer service team to focus on resolving issues.",
      content:
        "Answer: They face a lot of issues related to infrastructure tools and updating them.",
    },
    {
      title: "What is the most common issue the ticketing team faces?",
      content:
        "Answer: They face a lot of issues related to infrastructure tools and updating them.",
    },
  ];
  return (
    <div className="bg-primary text-white min-h-screen  flex items-center justify-center">
      <div className="container mx-auto  flex flex-col items-center justify-center text-center">
        <div className="bg-white flex  items-center justify-center  rounded-full my-10 w-full  p-3">
          <img
            src={camelLogo}
            alt="camelLogo"
            className="w-35 h-16 object-contain "
          />
        </div>
        <Link
          to={Routes.CHAT}
          className="bg-white text-primary py-2 px-20 rounded-2xl shadow-md hover:bg-gray-200 transition duration-300 font-bold text-xl"
        >
          Start Now
        </Link>
        <div className="flex flex-col items-center justify-center mt-10 gap-5">
          <div className="bg-white text-primary rounded-2xl p-1  max-w-7xl w-full flex items-start shadow-md">
            <div className="bg-primary text-white font-bold text-3xl px-8 py-8 rounded-l-2xl rounded-br-[80px]">
              LLM
            </div>

            <p className="text-md md:text-lg font-semibold px-6">
              We used a large language model in our company to assist our
              customer service team with the ticketing system. The model,
              trained on all company ticketing data, can answer inquiries about
              various issues and route them to the appropriate team. This helps
              the team work more efficiently and effectively, as they can focus
              on resolving issues rather than managing inquiries.
            </p>
          </div>

          {accordionArr.map((item, index) => (
            <AccordionItem key={index} title={item.title} num={index + 1}>
              {item.content}
            </AccordionItem>
          ))}
        </div>
      </div>
    </div>
  );
}
