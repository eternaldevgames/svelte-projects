<script>
import Modal from "./Modal.svelte";

	let showPopup = false;

	const onShowPopup = (ev) => {
		showPopup = true;
	}

	const onPopupClose = (data) => {
		showPopup = false;

		console.log(data);
	}

</script>

<main>
	<div class="container">
		
		<button type="button" class="btn btn-success" on:click={onShowPopup}>Show Popup</button>

		<Modal open={showPopup} onClosed={(data) => onPopupClose(data)}>
			<h2>Testing</h2>
		</Modal>
	</div>
</main>