import React from 'react'
import Link from "next/link";
import Image from 'next/image';
import { motion } from "framer-motion";
import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.actions";
import { getInterviewsByUserId, getLatestInterviews } from "@/lib/actions/general.action";

const Page = async () => {
    const user = await getCurrentUser()

    const [userInterviews, latestInterviews] = await Promise.all([
        getInterviewsByUserId(user?.id!),
        getLatestInterviews({ userId: user?.id! }),
    ])

    const hasPastInterviews = userInterviews?.length > 0
    const hasUpcomingInterviews = latestInterviews?.length > 0

    return (
        <>
            {/* Hero Section */}
            <section className="card-cta rounded-2xl px-4 sm:px-6 md:px-10 py-10 mt-6 h-auto md:h-[350px] flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-10 shadow-lg ">
                {/* Text Content */}
                <div className="flex flex-col gap-6 text-white w-full md:max-w-xl">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
                        Your AI-Powered Interview & <span className="text-purple-500">Feedback</span> Generator
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-gray-300">
                        Practice on Real Interview Questions & Get the Feedback on the basis of Your Performance
                    </p>
                    <Button asChild className="btn-primary w-full sm:w-fit px-6 py-3 text-sm sm:text-base font-semibold">
                        <Link href="/interview">Start an Interview</Link>
                    </Button>
                </div>

                {/* Image */}
                <div className="w-full flex justify-center md:justify-end hidden md:flex">
                    <Image
                        src="/img.png"
                        alt="AI orb"
                        className="w-[220px] sm:w-[280px] md:w-[350px] h-auto object-contain animate-float-spin"
                        width={350}
                        height={350}
                        priority
                    />
                </div>
            </section>

            {/* Past Interviews Section */}
            {/* Past Interviews Section */}
            <section className="flex flex-col gap-6 mt-10 rounded-2xl px-4 sm:px-6 py-6 backdrop-blur-lg">
                <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">Your Interviews</h1>

                <div className="w-full overflow-x-auto no-scrollbar">
                    <div className="flex gap-6 sm:gap-8 px-1 pb-2">
                        {hasPastInterviews ? (
                            userInterviews?.map((interview) => (
                                <div
                                    key={interview.id}
                                    className="flex-shrink-0 w-[260px] sm:w-[300px] md:w-[340px] min-h-[400px] snap-start transition-transform duration-300 hover:scale-105 hover:z-10 hover:shadow-xl bg-[#101010]/50 backdrop-blur rounded-2xl border border-white/10"
                                >
                                    <InterviewCard {...interview} />
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400">You haven't taken any interviews yet</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Upcoming Interviews Section */}
            <section className="flex flex-col gap-6 mt-10 rounded-2xl px-4 sm:px-6 py-6 backdrop-blur-lg">
                <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">Take an Interview</h1>

                <div className="w-full overflow-x-auto no-scrollbar">
                    <div className="flex gap-6 sm:gap-8 px-1 pb-2">
                        {hasUpcomingInterviews ? (
                            latestInterviews?.map((interview) => (
                                <div
                                    key={interview.id}
                                    className="flex-shrink-0 w-[260px] sm:w-[300px] md:w-[340px] min-h-[400px] snap-start transition-transform duration-300 hover:scale-105 hover:z-10 hover:shadow-xl bg-[#101010]/50 backdrop-blur rounded-2xl border border-white/10"
                                >
                                    <InterviewCard {...interview} />
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400">There are no new Interviews available</p>
                        )}
                    </div>
                </div>
            </section>

        </>
    );
}

export default Page;
