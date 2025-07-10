import React from 'react'
import Link from "next/link";
import Image from 'next/image';
import {dummyInterviews} from "@/constants";
import InterviewCard from "@/components/InterviewCard";


const Page = () => {
    return (
        <>
            <section className="card-cta">
                <div className="flex flex-col gap-6 max-w-lg">
                    <h2>
                        Get Interview-Ready with AI-Powered Practice & FeedBack
                    </h2>
                    <p className="text-lg">
                        Practice on Real Interview Question & Get Review
                    </p>
                    <button asChild className="btn-primary max-sm:w-full">
                        <Link href="/interview">Start an Interview</Link>

                    </button>
                </div>

                <Image src="/robot.png" alt="robo-dude" className="max-sm:hidden" width={400} height={400}/>

            </section>
            <section className="flex flex-col gap-6 mt-8">
                <h2>Your Interview</h2>

                <div className="interviews-section">
                    {dummyInterviews.map((interveiw) => (
                        <InterviewCard {...interveiw} key = {interveiw.id}/>
                    ))}

                </div>

            </section>

            <section className="flex flex-col gap-6 mt-8">
                <h2>
                    Take an Interview
                </h2>
                <div className="interviews-section">
                    {dummyInterviews.map((interveiw) => (
                        <InterviewCard {...interveiw} key = {interveiw.id}/>
                    ))}

                    {/*<p>You haven&apos;t taken any interviews yet</p>*/}
                </div>
            </section>
        </>
    )
}
export default Page
