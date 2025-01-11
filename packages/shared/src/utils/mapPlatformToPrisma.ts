import { Platform} from "../index.js";

export function mapPlatformToPrisma(platform: Platform): string {
    return platform;
}

export function mapPrismaToPlatform(platform: string): Platform {
    if (platform !== 'TIKTOK' && platform !== 'INSTAGRAM') {
        throw new Error(`Invalid platform: ${platform}`);
    }
    return platform;
}