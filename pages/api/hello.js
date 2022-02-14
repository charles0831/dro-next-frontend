// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  console.log("+++++++++ api hello");
  res.statusCode = 200
  res.json({ name: 'John Doe' })
}
