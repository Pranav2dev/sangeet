<script lang="ts">
  import { goto } from "$app/navigation";
  import { storage } from "$lib/appwrite";
  import { ID } from "appwrite";
  import Cookies from "universal-cookie";
  const cookie = new Cookies();

  let files: any = $state(null);
  let url: any = $state(null);
  let name: string = $state("");
  let email: string = $state("");
  let country: string = $state("");
  // let name: string = $state("");

  let loading: boolean = $state(false);
  let createLoading: boolean = $state(false);

  const handleFileChange = (e: any) => {
    files = e.target.files[0];
  };

  const handleUpload = async () => {
    loading = true;
    try {
      const res = await storage.createFile({
        bucketId: "6a324ea8003540d77367",
        fileId: ID.unique(),
        file: files,
      });

      const result = storage.getFileView({
        bucketId: "6a324ea8003540d77367",
        fileId: res.$id,
      });

      url = result;
    } catch (error) {
      alert("Error in uploading picture");
    } finally {
      loading = false;
    }
  };

  const handleCreate = async () => {
    const temp_token = sessionStorage.getItem("temp_token");
    createLoading = true;
    try {
      const res = await fetch(
        "https://neon-node.vercel.app/onboarding/profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${temp_token}`,
          },
          body: JSON.stringify({ name, email, country, profile_picture: url }),
        },
      );

      const result = await res.json();

      if (!res.ok) {
        alert("Error in response ERROR_CODE_RESPONSE_CREATE");
      }

      // Now we have the token, clear pending email
      // cookies.delete('pending_email', { path: '/' });
      sessionStorage.removeItem("temp_token");
      cookie.set("token", result.token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      goto("/");
    } catch (error) {
      alert("Error in creating profile");
      console.log(error);
    } finally {
      createLoading = false;
    }
  };
</script>

<div class="onboarding_page">
  <h2>Create Profile</h2>
  <div class="form-container">
    {#if !url}
      <div class="form-group">
        <label for="photo">Profile Photo</label>
        <div class="file-upload">
          <input
            onchange={handleFileChange}
            type="file"
            id="photo"
            name="photo"
            class="input"
            accept="image/*"
            required
          />
        </div>
        <button class="upload-btn" disabled={loading} onclick={handleUpload}
          >{loading ? "Uploading..." : "Upload"}</button
        >
      </div>
    {/if}
    <div>
      <div class="form-group">
        <label for="full-name">Full Name</label>
        <input
          type="text"
          id="full-name"
          name="name"
          bind:value={name}
          placeholder="Jane Doe"
          required
        />
      </div>

      <div class="form-group">
        <label for="email">Email Address</label>
        <input
          type="email"
          id="email"
          bind:value={email}
          name="email"
          placeholder="jane@example.com"
          required
        />
      </div>

      <div class="form-group">
        <label for="profile_picture">Profile Picture</label>
        <input
          disabled
          bind:value={url}
          type="url"
          id="profile_picture"
          name="profile_picture"
          placeholder=""
          required
        />
        <span class="text-white text-xs desc"
          >Already set after uploding picture</span
        >
      </div>

      <div class="form-group">
        <label for="country">Country</label>
        <input
          bind:value={country}
          type="text"
          name="country"
          placeholder="Country"
          id=""
        />
      </div>

      <button type="submit" disabled={createLoading} onclick={handleCreate}
        >{createLoading ? "Creating profile..." : "Register"}</button
      >
    </div>
  </div>
</div>

<style>
  .desc {
    font-family: var(--primary-text-medium-font);
  }
  .onboarding_page {
    height: 90vh;
    margin-top: 50px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .form-container {
    /* background: #1d1d1f; */
    padding: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    border-radius: 12px;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 750px;
  }

  @media (max-width: 780px) {
    .onboarding_page {
      height: fit-content;
    }
    .form-container {
      flex-direction: column;
    }
  }

  h2 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    text-align: center;
    font-family: var(--primary-bold-font);
    color: white;
    opacity: 0.75;
  }

  .form-group {
    margin-bottom: 1.25rem;
  }

  label {
    display: block;
    font-size: 0.875rem;
    /* font-weight: 600; */
    margin-bottom: 0.5rem;
    font-family: var(--primary-text-medium-font);
    color: lightgray;
  }

  input,
  select {
    font-family: var(--primary-text-medium-font);

    width: 100%;
    padding: 0.75rem;
    border: 1px solid gray;
    color: white;
    border-radius: 6px;
    font-size: 1rem;
    box-sizing: border-box; /* Ensures padding doesn't affect width */
    transition: border-color 0.2s;
  }

  input:focus,
  select:focus {
    outline: none;
    border-color: var(--primary-color);
    ring: 2px solid var(--primary-color);
  }

  /* Custom File Upload Styling */
  .file-upload {
    border: 2px dashed var(--border-color);
    padding: 1rem;
    text-align: center;
    border-radius: 6px;
    cursor: pointer;
    background: #000;
  }

  .file-upload:hover {
    background: #171718;
  }

  button {
    width: 100%;
    background-color: var(--primary-color);
    color: white;
    padding: 0.75rem;
    border: none;
    font-family: var(--primary-bold-font);
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    margin-top: 1rem;
    transition: opacity 0.2s;
  }

  button:hover {
    opacity: 0.9;
  }
</style>
