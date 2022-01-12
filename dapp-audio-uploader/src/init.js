import { config, user } from "@dash-incubator/dapp-sdk";
import { alert, state } from "ui/components";
import { dom, emitter } from "ui/lib";
import video from "../../dapp-video-uploader/src/upload/video";
import image from "../../dapp-image-uploader/src/upload/image";
import audio from "./upload/audio";

let initialized = false;

const init = async () => {
    if (initialized) {
        return;
    }

    // This step can be skipped in dapps once a metamask like
    // service is running for Dash.
    await user.init();

    let loading = dom.ref("anchor.loading"),
        wallet = await user.wallet.read();

    if (wallet.balance.confirmed > 0) {
        await image.register();
        await audio.register();
        await video.register();

        alert.deactivate.error();
        alert.success(
            "tDash found, all relevant contract information cached, welcome to the demo!",
            8
        );

        if (loading) {
            state.deactivate(loading.element);
        }

        emitter.dispatch("user.init");
    } else {
        alert.error(`Deposit tDash in <b>${wallet.address}</b> to continue`);

        setTimeout(init, 1000 * 45);

        initialized = true;
    }
};

emitter.once("components.mounted", init);
