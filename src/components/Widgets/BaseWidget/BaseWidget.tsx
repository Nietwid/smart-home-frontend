import {Center} from "rsuite";
import styles from "./BaseWidget.module.css"
interface Props {
    children: React.ReactNode;
    name?: string;
    size?: Size;
    ratio?: Ratio;
    className?: string;
}

type Size = 'xs' | 'sm' | 'md' | 'normal' | 'lg' | 'xl' | '2xl';
type Ratio = '1' | '4/3' | '3/2' | '16/9' | '2/1' | '1/2' | '3/4';

const sizeMap: Record<Size, { width: string; height?: string }> = {
    xs:     { width: '4rem',  height: '4rem'   },   // 64px
    sm:     { width: '5rem',  height: '5rem'   },   // 80px
    md:     { width: '8rem',  height: '8rem'   },   // 128px
    normal: { width: '13rem', height: '13rem'  },   // ≈208px (w-52)
    lg:     { width: '20rem', height: '20rem'  },   // 320px
    xl:     { width: '26rem', height: '26rem'  },
    '2xl':  { width: '32rem', height: '32rem'  },
};

export default function BaseWidget({
                                       name,
                                       children,
                                       size = 'normal',
                                       ratio = '1',
                                       className = '',
                                   }: Props) {
    const dims = sizeMap[size];
    const isSquare = ratio === '1';

    return (
        <Center
            className={`
        relative
        ${styles.center}              
        ${className}
      `}
            style={{
                width: dims.width,
                height: isSquare ? dims.height : 'auto',
                aspectRatio: isSquare ? undefined : ratio,
            }}
        >
            {name && (
                <p className={styles.name}>{name}</p>
            )}
                {children}
        </Center>
    );
}