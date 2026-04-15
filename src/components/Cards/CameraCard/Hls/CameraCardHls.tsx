import {useEffect, useRef, useState} from 'react';
import Hls from 'hls.js';
import {api} from "../../../../constant/api.ts";
import {useWebSocket} from "../../../WebSocketProvider.tsx";
import styles from "../WebRTC/CameraCardWebRTC.module.css";
import Header from "../../../ui/Headers/Header/Header.tsx";
import ThreeDot from "../../../ui/ThreeDot/ThreeDot.tsx";

interface HlsPlayerProps {
    id: number;
    name:string;
    maxRetry?: number;
    autoPlay?: boolean;
    muted?: boolean;
    controls?: boolean;
    className?: string;
}
export default function HlsPlayer({   id,
                                      name,
                                      maxRetry=5,
                                      autoPlay = true,
                                      muted = true,
                                      controls = true,
                                      className = '',}:HlsPlayerProps){
    const videoRef = useRef<HTMLVideoElement>(null);
    const openRef = useRef<boolean>(false);
    const retryCountRef = useRef(0);
    const {send, status} = useWebSocket();
    const [error, setError] = useState(false);

    const src = api.cameraStream(id)

    useEffect(() => {
        if (status === WebSocket.OPEN){
            send({type: "camera_open", id:id })
        }
    }, [status]);

    useEffect(() => {
        let retryTimeout:number;
        let hls:Hls;
        const video = videoRef.current;
        if (!video) return;

        video.pause();
        video.src = '';

        const playVideo = () => {
            video.play().catch((err) => {
                console.warn(err);
            });
        };
        const setupHls = ()=> {
            if (Hls.isSupported()) {
                hls = new Hls({
                    lowLatencyMode: true,
                    backBufferLength: 90,
                    maxBufferLength: 30,
                });

                hls.loadSource(src);
                hls.attachMedia(video);

                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    if (autoPlay) playVideo();
                    openRef.current = true;
                });
                hls.on(Hls.Events.ERROR, (_, data) => {
                    if (!data.fatal) return;
                    retryTimeout = setTimeout(() => {
                        hls?.destroy();
                        if (retryCountRef.current >= maxRetry){
                            setError(true);
                            return
                        }
                        setupHls();
                        retryCountRef.current ++;
                    },5000)
                });
            }
        }
        setupHls();
        return () => {
            retryTimeout && clearTimeout(retryTimeout);
            hls && hls.destroy();
        };
    }, [src, autoPlay]);

    return (
        <div className={`${styles.panel} ${className}`} >
            <div className={styles.header}>
                <Header disable={error}>{name}</Header>
                <ThreeDot className={styles.threeDots} to={`/camera/settings/${id}`}/>
            </div>
            <video
                ref={videoRef}
                className={`${styles.video} ${className}`}
                controls={controls}
                muted={muted}
                playsInline
                autoPlay={autoPlay && muted}
            />
        </div>
    );
};
