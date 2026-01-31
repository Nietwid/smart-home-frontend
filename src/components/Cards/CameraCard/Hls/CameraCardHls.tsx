import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import {api} from "../../../../constant/api.ts";
import {useWebSocket} from "../../../WebSocketProvider.tsx";
import styles from "../WebRTC/CameraCardWebRTC.module.css";
import Header from "../../../ui/Headers/Header/Header.tsx";
import ThreeDot from "../../../ui/ThreeDot/ThreeDot.tsx";

interface HlsPlayerProps {
    id: number;
    name:string;
    autoPlay?: boolean;
    muted?: boolean;
    controls?: boolean;
    className?: string;
}
export default function HlsPlayer({  id,
                                        name,
                                      autoPlay = true,
                                      muted = true,
                                      controls = true,
                                      className = '',}:HlsPlayerProps){
    // const  = useWebSocket();
    const videoRef = useRef<HTMLVideoElement>(null);
    const openRef = useRef<boolean>(false);
    const src = `${api.cameraStream}${id}/index.m3u8`;
    const {send, status} = useWebSocket();
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
                    console.error('HLS error:', data);
                    retryTimeout = setTimeout(() => {
                        hls?.destroy();
                        setupHls();
                    },5000)
                });
            }
        }
        setupHls();
        return () => {
            retryTimeout && clearTimeout(retryTimeout);
            hls && hls.destroy();
            if (status === WebSocket.OPEN && openRef.current){
                send({type: "camera_close", id:id })
            }
        };
    }, [src, autoPlay]);

    return (
        <div className={`${styles.panel} ${className}`} >
            <div className={styles.header}>
                <Header disable={true}>{name}</Header>
                <ThreeDot className={styles.threeDots} to={`/camera/settings/${id}`}/>
            </div>
            <video
                ref={videoRef}
                className={`${className}`}
                controls={controls}
                muted={muted}
                playsInline
                autoPlay={autoPlay && muted}
            />
        </div>
    );
};
