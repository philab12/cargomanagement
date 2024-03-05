import fastDelivery from '../assets/img/fast-delivery.png';
import { TbTruckDelivery } from "react-icons/tb";

function WhyUsComp(){
    return (
        <>
        <div className="mt-20 px-24 flex justify-between align-middle">
            <div className="w-1/2">
                <div className="p-2 bg-cyan-500 max-w-fit text-xl text-white">Why we are the best</div>
                <h2 className="text-4xl font-semibold my-5 text-passionBlue">Many Years Experiences in Courier Service
                </h2>
                <p>Doloribus debitis dolores amet, minus qui eaque itaque, doloremque at ipsa ab reiciendis assumenda et labore asperiores, cumque impedit! Corrupti, alias laboriosam!</p>
                <div className="flex gap-2 mb-3">
                    <div className="text-5xl text-passionBlue rounded-full p-5 hover:bg-passionBlue hover:text-white">
                        <TbTruckDelivery className=''/>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-passionBlue mb-2">Fast Delivery</h2>
                        <p className="leading-relaxed">Ut recusandae non veniam obcaecati, sunt earum atque cumque, alias quae molestiae quo, ad debitis saepe.</p>
                    </div>
                </div>
                <div className="flex gap-2 mb-3">
                    <div className="text-5xl text-passionBlue rounded-full p-5 hover:bg-passionBlue hover:text-white">
                        <TbTruckDelivery className=''/>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-passionBlue mb-2">Lowest Cost</h2>
                        <p className="leading-relaxed">Ut recusandae non veniam obcaecati, sunt earum atque cumque, alias quae molestiae quo, ad debitis saepe.</p>
                    </div>
                </div>
                <div className="flex gap-2 mb-3">
                    <div className="text-5xl text-passionBlue rounded-full p-5 hover:bg-passionBlue hover:text-white">
                        <TbTruckDelivery className=''/>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-passionBlue mb-2">Secure Service</h2>
                        <p className="leading-relaxed">Ut recusandae non veniam obcaecati, sunt earum atque cumque, alias quae molestiae quo, ad debitis saepe.</p>
                    </div>
                </div>
            </div>
            <div className="w-1/2 px-10 pt-16">
                <img src={fastDelivery} alt="" />
            </div>
        </div>
        <div className="bg-passionBlue">
            <div className='h-40'></div>
        </div>
        </>
    )
}

export default WhyUsComp