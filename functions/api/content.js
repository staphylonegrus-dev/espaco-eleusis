export async function onRequestGet(context) {
  const value = await context.env.SITE_CONTENT_KV.get("content");
  
  if (value === null) {
    return new Response(JSON.stringify({ success: false, error: "Not found" }), { 
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  return new Response(JSON.stringify({ success: true, content: JSON.parse(value) }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function onRequestPost(context) {
  try {
    const data = await context.request.json();
    const content = data.content;

    if (!content) {
      return new Response(JSON.stringify({ success: false, error: "No content provided" }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await context.env.SITE_CONTENT_KV.put("content", JSON.stringify(content));
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Contenido guardado correctamente' 
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ success: false, error: e.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}