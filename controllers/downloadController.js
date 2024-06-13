const ytdl = require("ytdl-core");

const downloadVideo = async (req, res) => {
  const videoUrl = req.query.url;

  if (!ytdl.validateURL(videoUrl)) {
    return res.status(400).send("Please enter a valid youtube URL");
  }

  try {
    const info = await ytdl.getInfo(videoUrl);
    const format = ytdl.chooseFormat(info.formats, { quality: "highest" });
    res.header(
      "Content-Disposition",
      `attachment; filename="${info.videoDetails.title}.mp4"`
    );
    ytdl(videoUrl, { format: format }).pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to download video");
  }
};

const getVideoDetails = async (req, res) => {
  const videoUrl = req.query.url;

  if (!ytdl.validateURL(videoUrl)) {
    return res.status(400).send("Please enter a valid youtube URL");
  }

  try {
    const info = await ytdl.getInfo(videoUrl);
    res.json({
      title: info.videoDetails.title,
      thumbnail: info.videoDetails.thumbnails[0].url,
      formats: info.formats.filter(
        (format) => format.hasVideo && format.hasAudio
      ),
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to get video details");
  }
};

module.exports = {
  downloadVideo,
  getVideoDetails,
};
