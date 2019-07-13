import { Override, Data } from "framer"
import { url } from "framer/resource"

const images = ["./assets/letterkenny.jpeg", "./assets/light-feather.jpeg"]

const state = Data<{ index: number; url: string | undefined }>({
    index: 0,
    url: undefined,
})

export function Billboard(): Override {
    return {
        url: state.url,
    }
}

export function TapTarget(): Override {
    return {
        onTap() {
            state.index = (state.index + 1) % images.length
            state.url = url(images[state.index])
        },
    }
}
