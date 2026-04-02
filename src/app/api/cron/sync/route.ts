import { NextRequest, NextResponse } from 'next/server';

// 对标网站数据
const REFERENCE_SITE = 'https://openclaw101.dev/';

// 抓取对标网站数据
async function fetchReferenceData() {
  try {
    const response = await fetch(REFERENCE_SITE, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; OpenClaw101Bot/1.0)',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }
    
    const html = await response.text();
    
    // 提取关键数据
    const stats = {
      totalSkills: extractNumber(html, /(\d[\d,]+)\s*\+?\s*Total Skills/i) || 72,
      totalTutorials: extractNumber(html, /(\d[\d,]+)\s*\+?\s*Tutorials/i) || 409,
      categories: extractNumber(html, /(\d+)\s*Categories/i) || 31,
      chineseTutorials: extractNumber(html, /(\d+)\s*Chinese/i) || 58,
      englishTutorials: extractNumber(html, /(\d+)\s*English/i) || 351,
    };
    
    return stats;
  } catch (error) {
    console.error('Failed to fetch reference data:', error);
    return null;
  }
}

function extractNumber(text: string, pattern: RegExp): number | null {
  const match = text.match(pattern);
  if (match) {
    return parseInt(match[1].replace(/,/g, ''), 10);
  }
  return null;
}

// 验证 Vercel Cron 签名
function verifyCronSignature(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  return authHeader === `Bearer ${process.env.CRON_SECRET}`;
}

export async function GET(request: NextRequest) {
  // 验证请求来源 — 仅允许本地开发或通过 CRON_SECRET 鉴权
  const isLocalDev = process.env.NODE_ENV === 'development';
  const isVercelCron = verifyCronSignature(request);
  
  if (!isLocalDev && !isVercelCron) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  console.log('[Cron] Starting daily sync at', new Date().toISOString());
  
  // 抓取对标网站数据
  const referenceData = await fetchReferenceData();
  
  if (!referenceData) {
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch reference data',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
  
  // 返回同步结果
  const result = {
    success: true,
    message: 'Daily sync completed',
    timestamp: new Date().toISOString(),
    data: {
      reference: referenceData,
      current: {
        totalSkills: 72,
        totalTutorials: 409,
        categories: 12,
      },
      needsUpdate: false, // 可以添加对比逻辑
    },
  };
  
  console.log('[Cron] Sync result:', JSON.stringify(result, null, 2));
  
  return NextResponse.json(result);
}

// 支持 POST 请求（Vercel Cron 使用 POST）
export async function POST(request: NextRequest) {
  return GET(request);
}
