#!/usr/bin/env python3
"""Convert markdown to Word-compatible HTML"""

import re
import html

def convert_md_to_html(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    html_content = ['<!DOCTYPE html>',
                    '<html>',
                    '<head>',
                    '<meta charset="UTF-8">',
                    '<title>When Your Nervous System Keeps You Anxious</title>',
                    '<style>',
                    'body { font-family: Calibri, Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 40px auto; padding: 20px; }',
                    'h1 { color: #2c3e50; font-size: 28pt; }',
                    'h2 { color: #34495e; font-size: 18pt; margin-top: 24pt; }',
                    'h3 { color: #34495e; font-size: 14pt; }',
                    'p { margin: 12pt 0; }',
                    'ul, ol { margin: 12pt 0; padding-left: 30pt; }',
                    'li { margin: 6pt 0; }',
                    'strong { font-weight: bold; }',
                    'em { font-style: italic; }',
                    '.highlight { background-color: #fff3cd; padding: 12pt; border-left: 4px solid #ffc107; margin: 16pt 0; }',
                    'blockquote { border-left: 4px solid #3498db; padding-left: 16pt; margin: 16pt 0; color: #555; font-style: italic; }',
                    '.citation { font-size: 10pt; color: #666; }',
                    'hr { border: 0; border-top: 1px solid #ddd; margin: 24pt 0; }',
                    '</style>',
                    '</head>',
                    '<body>']
    
    in_code_block = False
    in_list = False
    list_type = None
    list_items = []
    
    i = 0
    while i < len(lines):
        line = lines[i].rstrip()
        
        # Code blocks
        if line.startswith('```'):
            if in_code_block:
                html_content.append('</pre>')
                in_code_block = False
            else:
                html_content.append('<pre style="background: #f4f4f4; padding: 12pt; border-radius: 4px; overflow-x: auto;">')
                in_code_block = True
            i += 1
            continue
        
        if in_code_block:
            html_content.append(html.escape(line))
            i += 1
            continue
        
        # Empty lines end lists
        if not line.strip():
            if in_list:
                if list_type == 'ul':
                    html_content.append('</ul>')
                else:
                    html_content.append('</ol>')
                in_list = False
                list_type = None
            html_content.append('')
            i += 1
            continue
        
        # Headers
        if line.startswith('# ') and not line.startswith('## '):
            text = line[2:]
            text = process_inline(text)
            html_content.append(f'<h1>{text}</h1>')
            i += 1
            continue
        if line.startswith('## '):
            if in_list:
                if list_type == 'ul':
                    html_content.append('</ul>')
                else:
                    html_content.append('</ol>')
                in_list = False
            text = line[3:]
            text = process_inline(text)
            html_content.append(f'<h2>{text}</h2>')
            i += 1
            continue
        if line.startswith('### '):
            text = line[4:]
            text = process_inline(text)
            html_content.append(f'<h3>{text}</h3>')
            i += 1
            continue
        
        # Horizontal rule
        if line == '---':
            if in_list:
                if list_type == 'ul':
                    html_content.append('</ul>')
                else:
                    html_content.append('</ol>')
                in_list = False
            html_content.append('<hr>')
            i += 1
            continue
        
        # Blockquote
        if line.startswith('> '):
            text = line[2:]
            text = process_inline(text)
            html_content.append(f'<blockquote>{text}</blockquote>')
            i += 1
            continue
        
        # Lists
        if line.startswith('- '):
            if not in_list or list_type != 'ul':
                if in_list:
                    html_content.append(f'</{list_type}>')
                html_content.append('<ul>')
                in_list = True
                list_type = 'ul'
            text = line[2:]
            text = process_inline(text)
            html_content.append(f'<li>{text}</li>')
            i += 1
            continue
        
        # Numbered lists
        numbered_match = re.match(r'^(\d+)\.\s+(.+)$', line)
        if numbered_match:
            if not in_list or list_type != 'ol':
                if in_list:
                    html_content.append('</ul>')
                html_content.append('<ol>')
                in_list = True
                list_type = 'ol'
            text = numbered_match.group(2)
            text = process_inline(text)
            html_content.append(f'<li>{text}</li>')
            i += 1
            continue
        
        # Regular paragraph
        text = process_inline(line)
        html_content.append(f'<p>{text}</p>')
        i += 1
    
    # Close any open lists
    if in_list:
        if list_type == 'ul':
            html_content.append('</ul>')
        else:
            html_content.append('</ol>')
    
    html_content.extend(['</body>', '</html>'])
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(html_content))
    
    print(f"Created: {output_file}")

def process_inline(text):
    """Process inline formatting: bold, italic, links"""
    # Bold and italic (process nested)
    # Bold with **
    text = re.sub(r'\*\*\*([^*]+)\*\*\*', r'<strong><em>\1</em></strong>', text)
    text = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', text)
    # Italic with *
    text = re.sub(r'\*([^*]+)\*', r'<em>\1</em>', text)
    # Links [text](url)
    text = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2">\1</a>', text)
    return text

if __name__ == '__main__':
    convert_md_to_html(
        '/home/agent/.openclaw/workspace/anxious-nervous-system-draft.md',
        '/home/agent/.openclaw/workspace/anxious-nervous-system-draft.html'
    )
