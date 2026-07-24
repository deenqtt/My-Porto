import { ImageResponse } from 'next/og';

export const alt = 'Deden Hidayat — Software Engineer · Industrial IoT';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#f0ede6',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 22, letterSpacing: 4, color: '#7a6e64' }}>
          deden@sys:~$
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 26, letterSpacing: 6, color: '#bf5030', marginBottom: 16 }}>
            SOFTWARE ENGINEER — IoT · INDUSTRIAL PROTOCOLS · FULLSTACK
          </div>
          <div style={{ display: 'flex', fontSize: 130, fontWeight: 700, color: '#1a1410', lineHeight: 1 }}>
            DEDEN
          </div>
          <div style={{ display: 'flex', fontSize: 130, fontWeight: 700, color: '#bf5030', lineHeight: 1 }}>
            HIDAYAT
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', fontSize: 24, color: '#7a6e64' }}>
            firmware → middleware → API → frontend
          </div>
          <div style={{ display: 'flex', fontSize: 22, color: '#7a6e64', letterSpacing: 2 }}>
            github.com/deenqtt
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
