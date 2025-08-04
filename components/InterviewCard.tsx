import React from 'react'
import dayjs from "dayjs";
import Image from "next/image";
import {getRandomInterviewCover, cn} from "@/lib/utils";
import Link from "next/link";
import {Button} from "./ui/button";
import DisplayTechIcons from "./DisplayTechIcons";
import {getFeedbackByInterviewId} from "@/lib/actions/general.action";

const InterviewCard = async ({
                                 id,
                                 userId,
                                 role,
                                 type,
                                 techstack,
                                 createdAt
                             }: InterviewCardProps) => {
    const feedback =
        userId && id
            ? await getFeedbackByInterviewId({
                interviewId: id, userId
            })
            : null;

    const normalizedType = /mix/gi.test(type) ? "Mixed" : type;

    const badgeColor =
        {
            Behavioral: "bg-light-400",
            Mixed: "bg-light-600",
            Technical: "bg-light-800",
        }[normalizedType] || "bg-light-600";

    const formattedDate = dayjs(
        feedback?.createdAt || createdAt || Date.now()
    ).format("MMM D, YYYY");


    return (
        <div className="w-full h-full flex flex-col justify-between p-3 sm:p-4 rounded-2xl shadow-md bg-[#0f1117] relative">
            <div className="card-interview h-full flex flex-col justify-between">
                <div>
                    {/* Type Badge */}
                    <div
                        className={cn(
                            "absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg",
                            badgeColor
                        )}
                    >
                        <p className="badge-text">{normalizedType}</p>
                    </div>

                    {/* Cover Image */}
                    <Image
                        src={getRandomInterviewCover()}
                        alt="cover image"
                        width={90}
                        height={90}
                        className="rounded-full object-cover w-[70px] h-[70px] sm:w-[90px] sm:h-[90px]"
                    />

                    {/* Interview Role */}
                    <h3 className="mt-4 capitalize text-base sm:text-lg font-semibold">
                        {role} Interview
                    </h3>

                    {/* Date & Score */}
                    <div className="flex flex-row gap-5 mt-3 text-gray-300">
                        <div className="flex flex-row gap-2 items-center">
                            <Image src="/calendar.svg" alt="calendar" width={22} height={22} />
                            <p>{formattedDate}</p>
                        </div>

                        <div className="flex flex-row gap-2 items-center">
                            <Image src="/star.svg" alt="star" width={22} height={22} />
                            <p>{feedback?.totalScore || '---'}/100</p>
                        </div>
                    </div>

                    {/* Feedback or Placeholder Text */}
                    <p className="line-clamp-2 mt-5 text-gray-400">
                        {feedback?.finalAssessment || "You haven't taken the interviews yet. Take it to improve your skills."}
                    </p>
                </div>

                {/* Bottom Row: Techstack and Button */}
                <div className="flex flex-row justify-between items-end mt-4">
                    <DisplayTechIcons techStack={techstack} />

                    <Button className="btn-primary">
                        <Link href={feedback ? `/interview/${id}/feedback` : `/interview/${id}`}>
                            {feedback ? 'Check Feedback' : 'View Interview'}
                        </Link>
                    </Button>
                </div>
            </div>
        </div>

    );
};
export default InterviewCard
