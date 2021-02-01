import GlobalConfigs from "../../Config/GlobalConfigs";
import { Text } from "../../Managers/Theme";
import { randomNumber } from "../../Utils/Utils";

import Player from "../../Objects/Player";

export default function roundsCreate() {
	if (GlobalConfigs.debug) this.showFPSs = this.add.text(GlobalConfigs.screen.width - 55, 0, 0, Text);
}
