import laptophog from './laptophog.lottie'
import musichog from './musichog.lottie'
import sportshog from './sportshog.lottie'

/**
 * We're keeping lottiefiles in this folder.
 *
 * Keep the filename as `.lottie`, otherwise prettier will explode their size.
 * We're just `fetch`-ing these files, so let's treat them as binaries.
 *
 * Add new animations to AnimiationType
 *
 * See more: https://lottiefiles.com/
 */

export enum AnimationType {
    LaptopHog = 'laptophog',
    MusicHog = 'musichog',
    SportsHog = 'sportshog',
}

export const animations: Record<AnimationType, string> = { laptophog, musichog, sportshog }

const animationCache: Record<string, Record<string, any>> = {}
const fetchCache: Record<string, Promise<Record<string, any>>> = {}

async function fetchJson(url: string): Promise<Record<string, any>> {
    const response = await window.fetch(url)
    return await response.json()
}

export async function getAnimationSource(animation: AnimationType): Promise<Record<string, any>> {
    if (!animationCache[animation]) {
        if (!fetchCache[animation]) {
            fetchCache[animation] = fetchJson(animations[animation])
        }
        animationCache[animation] = await fetchCache[animation]
    }
    return animationCache[animation]
}
