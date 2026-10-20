# ✦ MACLOVIA — Alpine + X11/i3 para v86 (x86 de 32 bits)
#
# Derivado de tools/docker/alpine de copy/v86, con un escritorio X11 mínimo:
#   Xorg + driver fbdev (/dev/fb0 del bochs-drm) + libinput/udev + i3 + xterm
#   + mc (explorador de archivos en terminal) + tmux (consola multiplexor)
#
# El invitado NO tiene red, así que todo debe quedar instalado aquí.
# Se construye con:  npm run wasm:rootfs:build
#
# Notas de v86:
#   - VGA Bochs (PCI 1234:1111) y ratón PS/2: no hay GPU 3D.
#   - El kernel engancha la VGA con el driver DRM "bochs" y expone /dev/fb0;
#     X usa fbdev (Xorg driver vesa NO sirve: su int10 no ve el VESA BIOS).
#   - No se instala mesa-dri-gallium (inútil sin GPU y ~285 MB).
#   - Wayland no es viable; el escritorio es X11.

FROM docker.io/i386/alpine:3.21.0

ENV KERNEL=virt
ARG WITH_NODE=0
ARG APK_SCHEME=https

# Repos: main + community (Xorg/i3 viven en community).
# APK_SCHEME permite usar http:// en entornos con inspección TLS (Docker Desktop,
# antivirus…). Los paquetes siguen verificándose con la firma RSA de Alpine.
RUN sed -i "s|https://dl-cdn.alpinelinux.org|${APK_SCHEME}://dl-cdn.alpinelinux.org|g" /etc/apk/repositories && \
    (grep -q '/community' /etc/apk/repositories || \
     echo "${APK_SCHEME}://dl-cdn.alpinelinux.org/alpine/v3.21/community" >> /etc/apk/repositories)

# Base de v86 + escritorio.
RUN apk add --no-cache \
      openrc alpine-base agetty alpine-conf \
      linux-${KERNEL} linux-firmware-none \
      xorg-server xf86-video-fbdev xf86-input-libinput \
      eudev udev-init-scripts udev-init-scripts-openrc \
      xinit i3wm i3status dmenu xterm mc tmux \
      font-misc-misc font-dejavu xkeyboard-config xrandr xsetroot

# node es opcional (~46 MB). Por defecto no se instala: el objetivo es i3.
RUN if [ "$WITH_NODE" = "1" ]; then apk add --no-cache nodejs; fi

# v86 no tiene GPU 3D. xorg-server arrastra Mesa (gallium + LLVM, ~285 MB) por
# libGL/EGL, pero el driver fbdev no lo usa: se eliminan los archivos y se
# desactiva GLX en xorg.conf. Sin esto el rootfs pesa ~385 MB.
RUN rm -rf \
      /usr/lib/libLLVM*.so* \
      /usr/lib/libgallium*.so* \
      /usr/lib/libGL.so* \
      /usr/lib/libGLX*.so* \
      /usr/lib/libOpenGL*.so* \
      /usr/lib/libEGL*.so* \
      /usr/lib/libgbm*.so* \
      /usr/lib/libglapi*.so* \
      /usr/lib/gallium-pipe \
      /usr/lib/dri \
      /usr/share/drirc.d \
      /usr/share/vulkan

# Autologin en consola (tty1) y en serie; root sin contraseña (entorno de demo).
RUN sed -i 's/getty 38400 tty1/agetty --autologin root tty1 linux/' /etc/inittab && \
    echo 'ttyS0::respawn:/sbin/agetty --autologin root -s ttyS0 115200 vt100' >> /etc/inittab && \
    echo "root:" | chpasswd && \
    echo localhost > /etc/hostname

# Servicios: devfs + udev (necesario para libinput). Sin mdev/hwdrivers.
RUN rc-update add devfs sysinit && \
    rc-update add dmesg sysinit && \
    rc-update add udev sysinit && \
    rc-update add udev-trigger sysinit && \
    rc-update add udev-settle sysinit && \
    rc-update add udev-postmount default && \
    rc-update add sysfs boot && \
    for i in hwclock modules sysctl hostname syslog bootmisc; do rc-update add "$i" boot; done && \
    rc-update add killprocs shutdown

# Ratón PS/2 de v86: si psmouse es módulo, cárgalo al arrancar.
RUN find /lib/modules -name 'psmouse.ko*' | grep -q . && echo psmouse >> /etc/modules || true

# /etc/hostname no persiste desde Docker (es un bind mount); se fija al arrancar.
RUN mkdir -p /etc/local.d && \
    printf '#!/bin/sh\nhostname localhost\necho localhost > /etc/hostname\n' > /etc/local.d/hostname.start && \
    chmod +x /etc/local.d/hostname.start && \
    rc-update add local default

# Xorg (framebuffer), i3 y arranque de X.
COPY xorg-fbdev.conf /etc/X11/xorg.conf.d/10-v86.conf
COPY i3-config      /root/.config/i3/config
COPY i3status.conf  /etc/i3status.conf
COPY xinitrc        /root/.xinitrc
COPY motd           /etc/motd
RUN chmod +x /root/.xinitrc

# initramfs con 9p/virtio (igual que el rootfs base de v86).
RUN mkinitfs -F "base virtio 9p" "$(cat /usr/share/kernel/$KERNEL/kernel.release)"
