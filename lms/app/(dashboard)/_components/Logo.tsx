import Image from "next/image"

export const Logo = () => {
    return (
        <>
            {/* <p className="flex flex-col items-center text-indigo-700">Digest</p> */}
            <Image height={ 130 } width={ 130 } alt="digest logo displayed...!" src="/logo.svg" />
            {/* <p className="flex flex-col items-center text-indigo-700">{"Let's Learn Together"}</p> */}
        </>
    )
}