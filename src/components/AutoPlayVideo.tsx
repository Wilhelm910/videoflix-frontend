import videoSrc from '../assets/Kuchen.mp4';
import CustomButton from '../components/CustomButton';
import { buttonAndLinkStyle } from '../styles/buttonAndLink.style';

type AutoPlayVideoProps = {
    setPlayVideo: (play: boolean) => void
}

export default function AutoPlayVideo({ setPlayVideo }: AutoPlayVideoProps) {


    const onClick = () => {
        setPlayVideo(true)
    }

    return (
        <div className='flex justify-center flex-col mb-10'>
            {/* Video-Hintergrund */}
            <video
                className="w-full sm:w-[800px] object-cover shadow-xl rounded-lg self-center"
                src={videoSrc}
                autoPlay
                muted
                loop
                playsInline
                style={{
                    maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 90%)',
                    WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%)'
                }}
            ></video>
            {/* Overlay: Titel und Beschreibung */}
            <div className="text-white p-4 w-1/2 flex flex-col gap-3">
                <h1 className="text-lg sm:text-4xl font-bold">Leckerer Kuchen</h1>
                <p className="text-xs sm:text-base mt-2">
                    Entdecke die besten Rezepte für deinen neuen Lieblingskuchen.
                </p>
                <div>
                    <CustomButton buttonClick={onClick} content="Play" layout={buttonAndLinkStyle} />
                </div>
            </div>
        </div>
    )
}
