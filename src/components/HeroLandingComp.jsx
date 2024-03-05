import { Button, TextInput } from "flowbite-react"

function HeroLandingComp(){
    return (
    <>
        <div className="mt-20 flex h-80 justify-center items-center border-t-2 border-b-2 border-passionBeige bg-slate-300">
            <div className="text-center w-96">
                <h2 className="text-3xl text-passionBlue font-semibold mb-3">Track Your Parcel</h2>
                <TextInput type="text" className="w-full mb-2"/>
                <Button type="submit" className="w-full">Track</Button>
            </div>
        </div>
    </>
    )
}

export default HeroLandingComp